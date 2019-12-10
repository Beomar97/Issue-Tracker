class IssuesCollection {
    constructor() {
        this.collection = [];
    }

    getAllIssuesFromActiveProject(activeProject) {
        console.log("getAllIssuesFromActiveProject()");
        var currentIssues = [];
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].project_id == activeProject.id) {
                currentIssues.push(this.collection[i]);
            }
        }
        return currentIssues;
    }

    deleteAllIssuesFromActiveProject(activeProject) {
        console.log("deleteAllIssuesFromActiveProject()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].project_id == activeProject.id) {
                this.deleteInBackEnd(this.collection[i]);
            }
        }
    }

    addToIssuesCollection(issue) {
        console.log("addToIssuesCollection()");
        this.collection.push(issue);
    }

    removeFromCollection(issue) {
        console.log("removeFromCollection()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].client_id == issue.client_id) {
                this.collection.splice(i, 1);
            }
        }
    }

    updateChecked(issue) {
        console.log("updateChecked()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].client_id == issue.client_id) {
                if(this.collection[i].done == true) {
                    this.collection[i].done = false;
                } else {
                    this.collection[i].done = true;
                }
                this.updateInBackEnd(this.collection[i]);
            }
        }
    }

    saveInBackEnd(issue) {
        console.log("saveInBackEnd()");
        axios.post('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + issue.project_id + '/issues', issue)
            .then(function (response) {
                console.log(response);
                issueList._tag.issues.addToIssuesCollection(response.data);
                issueList._tag.issues.saveInLocalStorage(response.data);
                issueList._tag.update(); //Update Riot-Tag
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteInBackEnd(issue) {
        console.log("deleteInBackEnd()");
        axios.delete('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + issue.project_id + '/issues/' + issue.id)
            .then(function (response) {
                console.log(response);
                issueList._tag.issues.removeFromCollection(issue);
                issueList._tag.issues.removeFromLocalStorage(issue);
                issueList._tag.update(); //Update Riot-Tag
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateInBackEnd(issue) {
        console.log("updateInBackEnd()");
        axios.put('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + issue.project_id + '/issues/' + issue.id, issue)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    saveInLocalStorage(issue) {
        console.log("saveInLocalStorage()");
        var issues = JSON.parse(localStorage.getItem("issues")) || [];
        issues.push({
            client_id: issue.client_id,
            id: issue.id
        });
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    removeFromLocalStorage(issue) {
        console.log("removeFromLocalStorage()");
        var issues = JSON.parse(localStorage.getItem("issues")) || [];
        for(var i = 0; i < issues.length; i++) {
            if(issues[i].client_id == issue.client_id) {
                issues.splice(i, 1);
            }
        }
        localStorage.setItem("issues", JSON.stringify(issues));
    }

}