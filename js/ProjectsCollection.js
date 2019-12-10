class ProjectsCollection {
    constructor() {
        this.collection = [];
    }

    getAllProjects() {
        console.log("getAllProjects()");
        return this.collection;
    }

    addToProjectsCollection(project) {
        console.log("addToProjectsCollection()");
        this.collection.push(project);
    }

    removeFromProjectsCollection(project) {
        console.log("removeFromProjectsCollection()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].client_id == project.client_id) {
                this.collection.splice(i, 1);
            }
        }
    }

    getActiveProject() {
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].active == true) {
                return this.collection[i];
            }
        }
    }

    resetActiveProject() {
        console.log("resetActiveProject()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].active == true) {
                this.collection[i].active = false;
                this.updateInBackEnd(this.collection[i]);
            }
        }
    }

    setActiveProject(project_client_id) {
        console.log("setActiveProject()");
        for(var i = 0; i < this.collection.length; i++) {
            if(this.collection[i].client_id == project_client_id) {
                this.collection[i].active = true;
                this.updateInBackEnd(this.collection[i]);
            }
        }
    }

    saveInBackEnd(project) {
        console.log("saveInBackEnd()");
        axios.post('http://zhaw-issue-tracker-api.herokuapp.com/api/projects', project)
            .then(function(response) {
                console.log(response);
                projectsList._tag.projects.addToProjectsCollection(response.data);
                projectsList._tag.projects.saveInLocalStorage(response.data);
                projectsList._tag.update(); //Update Riot-Tag
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteInBackEnd(project) {
        console.log("deleteInBackEnd()");
        issueList._tag.issues.deleteAllIssuesFromActiveProject(project);
        axios.delete('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + project.id)
            .then(function (response) {
                console.log(response);
                projectsList._tag.projects.removeFromProjectsCollection(project);
                projectsList._tag.projects.removeFromLocalStorage(project);
                projectsList._tag.update(); //Update Riot-Tag
                issueList._tag.update(); //Update Riot-Tag
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateInBackEnd(project) {
        console.log("updateInBackEnd()");
        axios.put('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + project.id, project)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    saveInLocalStorage(project) {
        console.log("saveInLocalStorage()");
        var projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push({
            client_id: project.client_id,
            id: project.id 
        });
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    removeFromLocalStorage(project) {
        console.log("removeFromLocalStorage()");
        var projects = JSON.parse(localStorage.getItem("projects")) || [];
        for(var i = 0; i < projects.length; i++) {
            if(projects[i].client_id == project.client_id) {
                projects.splice(i, 1);
            }
        }
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    LoadProjectsAndIssuesFromBackEnd() {
        console.log("LoadProjectsAndIssuesFromBackEnd()");
        var projects = JSON.parse(localStorage.getItem("projects")) || [];
        for(var i = 0; i < projects.length; i++) {
            axios.get('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + projects[i].id)
                .then(function (response) {
                    console.log(response);
                    projectsList._tag.projects.addToProjectsCollection(response.data);
                    projectsList._tag.projects.resetActiveProject();
                    projectsList._tag.update(); //Update Riot-Tag
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.get('http://zhaw-issue-tracker-api.herokuapp.com/api/projects/' + projects[i].id + '/issues')
                .then(function (response) {
                    console.log(response);
                    for(var n = 0; n < response.data.length; n++) {
                        issueList._tag.issues.addToIssuesCollection(response.data[n]);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

}