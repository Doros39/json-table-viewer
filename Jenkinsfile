pipeline {
  agent {
    docker { image 'node:18-bullseye' }
  }

  environment {
    IMAGE_NAME = "doros39/json-table-viewer"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:coverage'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'test-results.xml'
          publishHTML (target: [
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'coverage/lcov-report',
            reportFiles: 'index.html',
            reportName: 'Coverage Report'
          ])
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }

  post {
    success {
      echo "Build succeeded."
    }
    failure {
      echo "Build failed."
    }
  }
}
