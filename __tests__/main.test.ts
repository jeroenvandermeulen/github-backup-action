import {getRepoNames} from '../src/main'

describe('getRepoNames', () => {
    let originalEnv: NodeJS.ProcessEnv

    beforeAll(() => {
        originalEnv = process.env
    })

    afterEach(() => {
        process.env = originalEnv // Restore original process.env after each test
    })
    it('should fetch repository names for the given organization', async () => {
        process.env = {
            CI: 'true',
            GH_ORG: 'myorg',
            GH_API_KEY: 'apikey',
            AWS_BUCKET_NAME: 'bucket',
            AWS_BUCKET_REGION: 'region',
            AWS_ACCESS_KEY: 'accesskey',
            AWS_SECRET_KEY: 'secretkey'
        }

        const organization = 'testOrg'

        const repoNames = await getRepoNames(organization)

        expect(repoNames).toEqual(['testorg/publicrepo', 'testorg/publicrepo2'])
    })

    it('should handle errors when fetching repository names', async () => {
        process.env = {
            CI: 'true',
            GH_ORG: 'myorg',
            GH_API_KEY: 'apikey',
            AWS_BUCKET_NAME: 'bucket',
            AWS_BUCKET_REGION: 'region',
            AWS_ACCESS_KEY: 'accesskey',
            AWS_SECRET_KEY: 'secretkey'
        }

        const organization = 'testOrgthatdoesnotexist'

        await expect(getRepoNames(organization)).rejects.toThrowError(
            'Not Found'
        )
    })
})
