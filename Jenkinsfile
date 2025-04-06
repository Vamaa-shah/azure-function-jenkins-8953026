pipeline {
    agent any

    environment {
        AZURE_CLIENT_ID = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
    }

    stages {
        stage('Checkout Code') {
            steps {
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
                bat 'npm test'
            }
        }

        stage('Zip Function App') {
            steps {
                bat 'powershell Compress-Archive -Path * -DestinationPath function.zip -Force'
            }
        }

        stage('Deploy to Azure') {
            steps {
                bat """
                    echo === Logging into Azure ===
                    az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    
                    echo === Deploying Function App ===
                    az functionapp deployment source config-zip --resource-group rg-vamaa --name hello-func-vamaa01 --src function.zip
                """
            }
        }
    }
}
