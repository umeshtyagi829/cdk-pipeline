// import { Stack, StackProps } from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as pipelines from 'aws-cdk-lib/pipelines';
// import { PipelineStage } from './pipeline-stage';


// export class PipelineStack extends Stack {
//     constructor(scope: Construct, id: string, props?: StackProps) {
//         super(scope, id, props);

//         const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
//             // The pipeline name
//             pipelineName: 'CdkPipeline',

//             // How it will be built and synthesized
//             synth: new pipelines.CodeBuildStep('Synth', {
//                 // Where the source can be found
//                 input: pipelines.CodePipelineSource.gitHub('umeshtyagi829/cdk-pipeline', 'master') ,

//                 installCommands: [
//                     'npm install -g aws-cdk'
//                 ],
//                 // Install dependencies, build and run cdk synth
//                 commands: [
//                     'npm ci',
//                     'npm run build',
//                     'npx cdk synth -c VPC_NAME=VPC -c ENV_NAME=DEV'
//                 ],
//             }),
//         });
//         const preprod = new PipelineStage(this, 'PreProd', {
//             // env: { account: '945515415056', region: 'us-east-1' }
//         });
//         const preprodStage = pipeline.addStage(preprod, {
//             post: [
//                 new pipelines.ShellStep('TestService', {
//                     commands: [
//                         'curl -Ssf $ENDPOINT_URL',
//                     ],
//                     envFromCfnOutputs: {
//                         // Get the stack Output from the Stage and make it available in
//                         // the shell script as $ENDPOINT_URL.
//                         ENDPOINT_URL: preprod.ApiEndpoint,
//                     },
//                 }),
//             ],
//         });
//         const prod = new PipelineStage(this, 'Prod', {
//             // env: { account: '945515415056', region: 'us-east-1' }
//         });
//         pipeline.addStage(prod, {
//             pre: [
//                 new pipelines.ManualApprovalStep('PromoteToProd'),
//             ],
//         });
//     }
// }