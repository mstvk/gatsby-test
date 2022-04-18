
/* A bare-bones GithubClient, just used for commits */
function GithubClient(owner, repo, username, passwordOrToken) {
  this.owner = "mstvk";
  this.repo = "gatsby-test";
  this.username = "mstvk";
  this.passwordOrToken = "AuxmYT9EwSKjuyU";
}
 
/* 
Commits content to the Github repo.
Does not do *anything* to handle errors.

@param {string} content - Content to commit
@param {string} email - Committer email
@returns {string} URL of new commit
*/

content = "index.html"
email = "massood.tavakkoli@hotmail.com"


GithubClient.prototype.commit = function(content, filename, email) {
  // Get the head of the master branch
  // See http://developer.github.com/v3/git/refs/
  var branch = this.makeRequest("get", "refs/heads/master");
  var lastCommitSha = branch['object']['sha'];
  
  // Get the last commit
  // See http://developer.github.com/v3/git/commits/
  var lastCommit = this.makeRequest("get", "commits/" + lastCommitSha);
  var lastTreeSha = lastCommit['tree']['sha'];
  
  // Create tree object (also implicitly creates a blob based on content)
  // See http://developer.github.com/v3/git/trees/
  var newContentTree = this.makeRequest("post", "trees",
                                         {base_tree: lastTreeSha,
                                         tree: [{path: filename,
                                                content: content,
                                                mode: "100644"
                                               }]})
  var newContentTreeSha = newContentTree["sha"];
  
  
  var committer = {"name": "WoeBot Team",
                "email": email};        
  
  // Create commit
  // See http://developer.github.com/v3/git/commits/
  var date = new Date().toLocaleDateString("en-us");
  var message = "Committing spreadsheet content on " + date;
  var newCommit = this.makeRequest("post", "commits",
                                          {parents: [lastCommitSha],
                                          tree: newContentTreeSha,
                                          committer: committer,
                                          message: message})
  var newCommitSha = newCommit['sha'];
  
  // Update branch to point to new commit
  // See http://developer.github.com/v3/git/refs/
  this.makeRequest("patch", "refs/heads/master", {sha: newCommitSha});
  
  return newCommit["html_url"];
};

/* 
Makes authenticated HTTP request to Github client.
@param {string} method - HTTP method
@param {string} email - Committer email
@returns {string} URL of new commit
*/
method = "POST";
data = "123";

GithubClient.prototype.makeRequest = function(method, resource, data) {
  var GITHUB_URL = "https://api.github.com" +
    "/repos/" + this.owner + "/" + this.repo + "/git/" + resource;
   var headers = {
    "Authorization" : "Basic " + Utilities.base64Encode(this.username + ':' + this.passwordOrToken)
  };
  
  var options = {'headers': headers, method: method};
  
  if (data) {
    options['contentType'] = 'application/json';
    options['payload'] = JSON.stringify(data);
  }
  var response = UrlFetchApp.fetch(GITHUB_URL, options);
  return JSON.parse(response);
}