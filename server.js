const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const connectionString = 'mongodb+srv://aks:tsf-bank-aks@cluster0.lvppm.mongodb.net/customers?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        console.log('Connected to Database')
        const db = client.db('customers');
        const usersCollection = db.collection('users');

        // 2
        let msg = '';
        // 2 ends

        app.get('/', function (req, res) {

            // const usersCollection = db.collection('users');

            usersCollection.find().toArray()
                .then(results => {
                    // res.render('index.ejs', { userList: results });
                    // 3
                    res.render('index.ejs', { userList: results, alert: msg });

                    msg = '';
                    /** bcoz of the just above line the alert problem was solved
                     * msg value was not changing on refreshing the page.
                     */
                    // 3 ends
                })
                .catch(error => console.error(error));

        })

        app.post('/formData', (req, res) => {
            console.log('post');
        })

        app.put('/formData', (req, res) => {
            console.log('put');

            // try {
            let senderAccNo = parseInt(req.body.senderAccNo);
            let receiverAccNo = parseInt(req.body.receiverAccNo);
            let moneyVal = parseInt(req.body.moneyVal);
            // if (typeof (senderAccNo) == 'number' && typeof (receiverAccNo) == 'number' && typeof (moneyVal) == 'number') {
            if (senderAccNo && receiverAccNo && moneyVal) {

                console.log(senderAccNo, receiverAccNo, moneyVal);

                usersCollection.find({ accNo: senderAccNo }).toArray()
                    .then(sender => {
                        // senderBalance = sender[0].balance;
                        console.log('here', sender[0].balance, moneyVal);

                        if (sender[0].balance >= moneyVal) {
                            // इस if का मतलब की sender के पास enough paisa है
                            //sender ka balance sb me badalna hai
                            usersCollection.findOneAndUpdate({ accNo: senderAccNo },
                                {
                                    $set: {
                                        balance: parseInt(sender[0].balance - moneyVal)
                                    }
                                })
                                .then(
                                    usersCollection.find({ accNo: receiverAccNo }).toArray()
                                        .then(receiver => {

                                            usersCollection.findOneAndUpdate({ accNo: receiverAccNo },
                                                {
                                                    $set: {
                                                        balance: parseInt(receiver[0].balance + moneyVal)
                                                    }
                                                })
                                        })
                                        // 6
                                        .then(
                                            msg = 'Transfer Successful😎     Please Refresh the page to view changes'
                                        )
                                    // 6 ends
                                )

                        }
                        else {
                            console.log('Insufficient Balance');
                            // notif('Insufficient Balance');
                            // 4
                            msg = 'Sender has Insufficient Balance in Account😟';
                            // 4 ends
                        }
                    })
                    .catch(error => console.log(error));

            }
            else {
                console.log('improper data');
                // 5
                msg = 'Improper or No Data provided 🤔 please provide proper data👀';
                // 5 ends
            }

            res.redirect('/');
        });

    const port = process.env.PORT || 3000    
    app.listen(port, function () {
            console.log(`listening on ${port}`)
        });
    });
