# Work with Git

[Git](https://git-scm.com) is used as a [DVCS](https://en.wikipedia.org/wiki/Distributed_version_control). In this chapter, you will find how we use Git on a daily-basis to code and collaborate with the team.

If you are looking for a good introduction to Git, take a look at the [_Git In Practice_](https://github.com/GitInPractice/GitInPractice#readme) book from Mike McQuaid.

## Git conventions

### Commit granularity

We tend to favor low granularity-but-consistent commits to a long series of commit. If you have multiple commits in a feature branch, it means that you had to address multiple issues to achieve your feature. We can run the test suite on every commit and it should always stay green 😎.

### Commit message

We follow an emoji-driven commit message format adapted from [Angular guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines). A typical commit message should look like:

```
<type>(<scope>) <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Where **type** must be an emoji chosen from the [gitmoji guide](https://gitmoji.carloscuesta.me/).

And the **scope** should point to the django application or stack component that may be affected, _e.g._:

* docker
* apps:core
* plugins:foo

The **subject** contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot \(.\) at the end

Just as in the subject, use the imperative, present tense for the **body**: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with the previous behavior.

The **footer** should contain any information about breaking changes and is also the place to reference GitHub/GitLab issues that this commit closes.

Breaking changes should start with the word `BREAKING CHANGE`: with a space or two newlines. The rest of the commit message is then used for this.

## Git workflows

For the sake of simplicity, to ease interaction with the community, we use the [GitHub flow](https://guides.github.com/introduction/flow/index.html) for open-source projects. In a few words:

* the `master` branch is always stable and deployable,
* tags from the master branch are considered as releases,
* contributors have to fork or create a new feature-branch to work on \(if they are allowed to in the original repository\) and propose a pull request to merge their branch to `master`.

## Working with forges

### Declaring issues

_For now, new issues are declared in a dedicated Trello board. This is a temporary situation. In the following, we will describe how it should be_ 🤓

When declaring a new issue, please describe as much as possible the **purpose** of your issue, and eventually make a **proposal** on how it should be solved or investigated. Choose wisely a label for this issue and please do not assign someone to it \(unless you already discussed with her verbally and had an agreement\).

### Working with pull requests \(PR\)

We recommend to create a pull request \(PR\) or merge request \(MR\) in GitLab semantic as soon as possible with the `WIP` flag preceding your PR title, _e.g._ `WIP: 😎(docker) add mongo service`.

When your work is done on this PR, remove the `WIP` flag and please ensure that:

* your feature or fix is **tested ** \(all continuous integration tests should be green and code coverage **should not** decrease\),
* your feature is **documented**,
* your branch is **up-to-date** with the target branch \(it should be rebased and force-pushed\).

Once all of those requirements are met, ask for a review of your code by assigning maintainers to your PR. Your changes should be approved by **at least one contributor of the core team** to be merged.

Last but not least, a code review should not take more than half an hour per PR to be profitable for everyone. It means that you have anticipated the amount of changes required to achieve your work. If those changes are bigger than 500 lines, then you may consider to split your feature in multiple PRs.

Note that the target branch \(`master`\) will be write-protected, _i.e._ no one is allowed to push to it. Hence you will need to use the forge UI to merge your PR once all tests are green and your changes have been approved. Our PR merging strategy is: **rebase and merge** ; we do not want a merge commit.

## Releasing new software version

Whatever the language you are using on a project, cooking a new release \(_e.g._ `3.1.78`\) should follow a standard procedure described below:

1. Create a new branch named: `release/3.1.78`,
2. Bump the release number in the appropriate file:
    ```
    package.json
    web/package.json
    ```
3. Update the project's `Changelog` following the [keepachangelog](https://keepachangelog.com) recommandations,
4. Commit your changes with a standard message title like: `🔖(minor) Bump release to 3.1.78`,
5. Open a pull or merge request depending on the current forge of the project,
6. Wait for an approval from your peers,
7. Merge your pull or merge request,
8. Checkout and pull changes from the `master` branch,
9. Tag & push your commit: `git tag 3.1.78 && git push origin --tags`

### Checking project tags consistency

As we are only Humans, we are error-prone _per se_. To avoid tagging consistency errors, we recommand to integrate the following tests in the project's continuous integration workflow before publishing a new release:

```bash
# Get current release number
VERSION="$(cat package.json | jq -r .version)"

# Check that the current tag (X.Y.Z) matches the release number
[[ "${VERSION}" == "${CIRCLE_TAG}" ]]
```

In this example script `$CIRCLE_TAG` is an environment variable defined by the contious integration platform \(CircleCI in this case\) with the pushed tag value.

### Howto get the release
1. Create a [personal token](https://gitlab.com/profile/personal_access_tokens) with `api` scope, [official doc](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).
2. Get the Artifact with this code :
```bash
GITLAB_TOKEN=<your_access_token>
GITLAB_PROJECT_ID=13895890
GITLAB_REF=<your_tag>
GITLAB_ARTIFACT_PATH="hubdigital.tgz"
GITLAB_JOBNAME="save_artifact"

curl --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
    --output ${GITLAB_ARTIFACT_PATH} \
    "https://gitlab.com/api/v4/projects/${GITLAB_PROJECT_ID}/jobs/artifacts/${GITLAB_REF}/raw/${GITLAB_ARTIFACT_PATH}?job=${GITLAB_JOBNAME}"
```

## Create hotfix for a specific tag

### Prepare your git repo

First update your local repo and check if the commit exist

```bash
git checkout master
git pull
git fetch --tags
git tag | grep 3.1.78
```

Then, create the main hotfix branch, with a name like **hotfix-*<x.x.x>***.
This branch is used by the CI for create the hotfix-release tgz
and to follow all the fix of a specific tag.

```bash
git checkout -b hotfix-3.1.78 3.1.78
```

### Create the fix branch

From the **hotfix-x.x.x** create the fix branch named **hotfix/*<x.x.x>*-*<my_fix>***

```bash
git checkout -b hotfix/3.1.78-auth0urldynamic
```

Commit your changes for fix the problem. Stay on the same branch, before to bump the hotfix number.

### Release the hotfix

1. Bump the hotfix number in the appropriate file:
    ```
    package.json
    web/package.json
    ```
    In our case the fist hotfix number of the tag **3.1.78** is **3.1.781**.
2. Update the project's `Changelog` following the [keepachangelog](https://keepachangelog.com/en/0.3.0/) recommandations.
3. Commit your changes with a standard message title like: `🔖(hotfix) Bump hotfix to 3.1.781`
4. Push your branch 
    ```
    git push origin hotfix-3.1.78
    push origin hotfix/3.1.78-auth0urldynamic
    ```
5. Open a pull or merge request, depending on the current forge of the project, into the **hotfix-x.x.x** branch (`hotfix-3.1.78`) from **hotfix/*<x.x.x>*-*<my_fix>*** (`hotfix/3.1.78-auth0urldynamic`). ⚠️🚨⚠️ DON'T OPEN A PULL/MERGE REQUEST INTO **MASTER**⚠️🚨⚠️
6. Wait for an approval from your peers.
7. Merge your pull or merge request.
8. Checkout and pull changes from the hotfix branch (`hotfix-3.1.78`).
9. Tag & push your commit: `git tag 3.1.781 && git push origin --tags`