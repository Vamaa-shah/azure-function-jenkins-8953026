pipeline {
    agent any

    environment {
        // Reference your GitHub PAT stored as a Jenkins "Username with Password"
        GITHUB_USERNAME = credentials('github-pat').username
        GITHUB_TOKEN = credentials('github-pat').password

        // Azure service principal credentials (stored as secret text separately)
        AZURE_CLIENT_ID = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git(
                    url: 'https://github.com/Vamaa-shah/azure-function-jenkins-8953026.git',
                    branch: 'main',
                    credentialsId: 'github-pat'
                )
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'No tests yet — you can add Jest or Mocha later'
            }
        }

        stage('Zip the Function') {
            steps {
                bat 'powershell Compress-Archive -Path * -DestinationPath function.zip'
            }
        }

        stage('Deploy to Azure') {
            steps {
                bat '''
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az functionapp deployment source config-zip --resource-group rg-vamaa --name hello-func-vamaa01 --src function.zip
                '''
            }
        }
    }
}
