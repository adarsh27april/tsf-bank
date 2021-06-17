const btnSendMoney = document.getElementById('sendMoney');
const sender = document.getElementById('sender');
const receiver = document.getElementById('receiver');
const money = document.getElementById('money');

console.log('main.js');
btnSendMoney.addEventListener('click', _ => {
    console.log('btn click');
    fetch('/formData', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            senderAccNo: sender.value,
            receiverAccNo: receiver.value,
            moneyVal: money.value
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
});