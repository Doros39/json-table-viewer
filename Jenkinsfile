pipeline {
  agent any
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Test') { steps { sh 'npm test' } }
    stage('Build') { steps { sh 'npm run build' } }
  }
}