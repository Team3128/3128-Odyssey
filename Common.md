# Common
## Preamble
This documentation outlines the various practices that we want to uphold to keep our organization clear, streamlined, and structured for our common repository. 
This includes BOTH GITHUB and CODE structure.

Authors: William Yuan (Wallim), Teja Yaramada

## Prefix Info
There will be NO FORKS, ONLY BRANCHES

__Defining “good enough”:__

- Code reviewed
- Tested on physical components (Off robot testing)
- Can vary specifically per project (Milestones)
  - Criteria based off of functionalities implemented by strat and mech
  - Quantify success criteria with verification process
  - Goal oriented enhancements

__Defining “push often” (NOT time based):__

- Code does not need to be complete when pushed
- Code should not have broken code, compilable
  - If something is crucially incomplete, put a comment or a placeholder:
  ```
  //TODO
  //FIX THIS
  //NOTE
  temp variables
  ```
  - Should be able to be searched up to be corrected
 
__Code reviewing__

- EVERYONE can code review, in fact it is encouraged
  - However, this does not entail that you are allowed to accept pull requests
- Being a Request Manager
  - Software Lead + Dept Coord
  - Experienced upperclassmen, project-lead
  - Understand issues
    - Sloppiness, awful structure
    - Logic flaw (typically very hidden, hard to detect)
  - Multiple request managers can review a pull request

## Repository Structure and Branches
__THERE IS ONLY ONE, CONSTANT THROUGHOUT ALL YEARS__

### MAIN
This is the __ROOT__ branch, also known as the __COMP READY BRANCH__

__NO JUNK IN MAIN__ Code here should be clean, “good enough” to compete  

__DEV -> MAIN__ Only branch that can push to main is the dev branch

Once there is a new push, a new OFFICIAL RELEASE will be created to Github

- Program Lead + Dept Coord Job

### COMP
__Branches only off main__

__Purpose__ make any quick (sloppy) and ESSENTIAL changes during comp, away from MAIN

__!!!ATTENTION!!!__ WE SHOULD NOT IN 99.99% OF CASES EVER MAKE A COMP BRANCH FOR COMMON REPO. WE ONLY MAKE ONE IF LOGIC WITHIN THE COMP READY COMMON IS SO FUNDEMENTALLY FLAWED IT CAUSES US TO LOSE THE COMPETITION

__MAIN -> COMP -> DEV__ once the comp is OVER, this branch will NOT be pushed back into main, rather worked on/clean up/corrected in dev

__Naming__

- Branch:
> {comp}_{year}
- Push to branch:
> {comp} day {1,2,3...} {datetime}
> __(Should be done every night after a comp day)__

### Project
__Only branches off of dev__ 

__Within the branch__ people SHOULD:

- Push OFTEN, even if it is not done (every GOOD change, “working not done”)
- __PROJECT->DEV__ Once a milestone is met, push into dev, then continue working on the branch
- Work toward ONE milestone at a time, chronologically

__Merging Procedures__

- Once a project pushes ANY milestone into dev, it is the other people’s job working on other projects to sync with dev
- __FIRST PUSH WINS__

__Naming Standards__

- Branch:
> {project name}_{project leader}
- Pushes to a branch:
> {person}_{datetime}
- Pushes to dev:
> {project name}_{milestone name}

### Deleting Branches
__RESPONSIBILITY OF SOFT LEAD + DEPT COORD__

## Github Submodule Guide
### What is a Submodule?
<p> A Git Submodule is a specific folder or address within a repository or project that directs the contents of another respository into the specified file location. 
Submodules are overlooked by the Git machine unless the submodule is entered. When looking at changes through Github Desktop, changes made inside the module will not be detected and must be handled through the console.<p>

<p>The main component behind a Git Submodule is the `.gitmodules` file that can either be auto-generated or manually created. 
The contents of this file provides the necessary information for Submodule setup in the project, but further steps are required to setup code usage.<p>

The contents of the `.gitmodules`:
```
[submodule "libs/3128-common"]
	path = libs/3128-common
	url = https://github.com/Team3128/3128-common.git
```
<br>

### Setting up a Submodule
Submodules can be accessed and configured using the `git submodule` commands in the terminal.

### Removing Submodule and Directories
To remove submodule, directory, and related cache:
```
git rm [-f | --force] [-n] [-r] [--cached] [--ignore-unmatch] [--quiet] [--pathspec-from-file=<file> [--pathspec-file-nul]] [--] [<pathspec>…​]
```

```
git rm -r --cached libs/3128-common
```

### Adding Submodules
To add the submodule from the github cloud to the `libs/3128-common` destination:
```
git submodule [--quiet] add [-b "branch"] [-f|--force] [--name "name"] [--reference "repository"] [--] "repository" ["path"]
```

```
git submodule add https://github.com/Team3128/3128-common.git libs/3128-common
```
`--force` may be appended if required.

### Configuring Gradle Implementation
In order for projects in the main repository to access files from the submodules, the directory must be included in the gradle project, and it must be configured as an implementation. <br>

Navigate to the `settings.gradle` file in the main project and append the following inclusion and project:
```
include ':libs:3128-common'
project(':libs:3128-common').projectDir = file('libs/3128-common')
```
<br>

Navigate to the `build.gradle` file in the main project and add the project as a dependency:
```
dependencies {

    implementation project(':libs:3128-common')

	// other dependencies
}
```
<br>

Then `cd` into the submodules and build the gradle project. Starting from the main proejct:
```
cd libs/3128-common
./gradlew build
```
<br>

After, `cd` back to the main project and run a gralde build:
```
cd ../..
./gradlew build
```

### Quick Submodule Setup
1. Remove any existing directories or chache
```
git rm -r --cached libs/3128-common
```
2. Clone from default branch or specified branch: 
```
git submodule add https://github.com/Team3128/3128-common.git libs/3128-common
```
3. Include the project by navigating to `settings.gradle` and adding: 
```
include ':libs:3128-common'
project(':libs:3128-common').projectDir = file('libs/3128-common')
```
4. Add the dependency by navigating to `build.gralde` and adding:
```
dependencies {

    implementation project(':libs:3128-common')

	// other dependencies
}
```
5. Build the submodule project:
```
cd libs/3128-common
./gradlew build
```
6. Build the main project:
```
cd ../..
./gradlew build
```

### Basic Git Commands
The following is taken from the Git help page.

> To use these commands on a submodule, the `git submodule foreach` can be appended to the front to call for all modules, or the command can be called by navigating to the submodule directory.

To start a working area:
* `git clone`		Clone a repository into a new directory
* `git init`		Create an empty Git repository or reinitialize an existing one

To work on the current change
* `git add`			Add file contents to the index
* `git mv`			Move or rename a file, a directory, or a symlink
* `git restore`		Restory working tree files
* `git rm`			Remove files from the working tree and from the index

To examine the history and state:
* `git status`		Show the working tree status
* `git diff`		Show changes between commits, commit and working tree, ect.
* `git bisect`		Use binary search to fine the commit that introduced a bug
* `git grep`		Print lines matching a pattern
* `git log`			Show commit logs
* `git show`		Show various types of objects

To grow, mark, and tweak your common history:
* `git branch` 		List, create, or delete branches
* `git checkout`	Switch branches or restore working tree files
* `git commit`		Record changes to the repository
* `git merge`		Join two or more development histories together
* `git rebase`		Reapply commits on top of another base tip
* `git reset`		Reset current HEAD to the specified state
* `git revert`		Revert some existing commits
* `git stash`		Stach the changes in a dirty working directory away
* `git switch`		Switch branches
* `git submodule`	Initialize, update, or inspect submodules
* `git tag`			Create, list, delete, or verify a tag object signed with GPG

To collaborate:
* `git fetch`		Downlead objects and refs from another repository
* `git pull`		Fetch from and integrate with another repository or local branch
* `git push` 		Update remote refs along with associated objects

<br> Call `git help -a` to read all git commands.


### 10 Step Commit Process

1. `./gradlew build`		Build gradle project for compile time errors
2. `git pull`		Fetch from and integrate with origin
3. `git branch -a`		View all local and remote branches
4. `git checkout <BRANCH NAME>`			Switch branches with working tree files
5. `git staus`		Show the working tree staus
6. `git add --all`		Stage all untracked files
7. `git status`		Show the working tree status with all untracked files
8. `git branch`		Double check current branch
9. `git commit -m <COMMIT MESSAGE>`		Commit staged changes to current local branch
10. `git push`		Push commit changes from local to origin

### RUNNING THE AUTO BASH SETUP
__Download and put the submod_setup.sh file into your repository. Then run the following cmds.__

```
chmod +x submod_setup.sh
./submod_setup.sh submodule

```

