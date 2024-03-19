# To Dos for Workflow Files

- `workflows/create_preview`
  - `env` variables need to be defined with client specific values or values from Cloudformation
  - Do not yet know how to get the `executionRoleARN` value
  - Security groups in Gander used `SG_ID` variable but not defined anywhere I renamed it to `SG_NAME` since that was defined as an `env` variable.
  -

# To Dos for Action Files

- `actions/deploy-preview/action`

  - line 100: update hardcoded lb name to client lb name created in Cloudformation
  - line 113 and 154 update hardcoded host names for LB rule and generated URL

- `actions/delete-preview/action`
  - Why can you use {{}} in shell script?
  - Why can we use $PROJECT-$PR_NUMBER in next run?
  - WTF is this `ECR_SEED_IMAGE_TAG=${{ env.PROJECT }}-seed-${{ env.PR_NUMBER }}`
  - `ECR_SEED_IMAGE_TAG=${{ env.PROJECT }}-seed-${{ env.PR_NUMBER }}`
  - included on line 18 `imageTag=$ECR_SEED_IMAGE_TAG`
  - Line 32 Why is this called SETUP? Where does Gander do this?
  - Line 50 hardcoded load balancer name needs to be updated
