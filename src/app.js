const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// midleware
function validadeProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
      return response.status(400).json({ error: "Invalid project ID."});
  }

  return next();
}

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const likes = 0;

  const respository = { id: uuid(), title, url, techs, likes };

  repositories.push(respository);

  return response.json(respository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repositories => repositories.id == id);

  if(repositoryIndex < 0) {
      return response.status(400).json( { error: 'Repository not found.'})
  }
  
  const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repositories => repositories.id == id);

  if(repositoryIndex < 0) {
      return response.status(400).json( { error: 'Repository not found.'})
  }

  // remove do array
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repositories => repositories.id == id);

  if(repositoryIndex < 0) {
    return response.status(400).json( { error: 'Repository not found.'})
  }

  repositories[repositoryIndex].likes++;
  
  return response.json(repositories[repositoryIndex]);

});

module.exports = app;
