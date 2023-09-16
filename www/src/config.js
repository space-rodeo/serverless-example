// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
    "api_base_url": "<YOUR URL HERE>" // ServerlessFunctionAPI
}

export default config;