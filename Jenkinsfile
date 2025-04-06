pipeline {
    agent any

    environment {
        // Azure credentials defined in environment block
        AZURE_CLIENT_ID = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Use GitHub credentials here (not in env block)
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Vamaa-shah/azure-function-jenkins-8953026.git',
                        credentialsId: 'github-pat'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'No tests defined yet.'
            }
        }

        stage('Zip Function App') {
            steps {
                bat 'powershell Compress-Archive -Path * -DestinationPath function.zip'
            }
        }

        stage('Deploy to Azure') {
            steps {
                bat """
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    az functionapp deployment source config-zip -g rg-vamaa -n hello-func-vamaa01 --src function.zip
                """
            }
        }
    }
}
