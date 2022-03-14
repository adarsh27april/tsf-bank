// pipeline {
//     // agent {
//     //     docker {
//     //         image 'node:lts-bullseye-slim' 
//     //         args '-p 3000:3000' 
//     //     }
//     // }
//     agent any
//     tools {nodejs "node"}
//     stages {
//         stage('Build') { 
//             steps {
//                 sh 'npm install' 
//             }
//         }
//     }
// }

pipeline {
  agent any
    
  tools {nodejs "NodeJS"}
    
  stages {
        
    // stage('Git') {
    //   steps {
    //     git 'https://github.com/****/****'
    //   }
    // }
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh '<<Build Command>>'
      }
    }  
    
            
    // stage('Test') {
    //   steps {
    //     sh 'node test'
    //   }
    // }
  }
}