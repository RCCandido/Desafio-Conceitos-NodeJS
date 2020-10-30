const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

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

  const repository = repositories[repositoryIndex]
  
  repositories[repositoryIndex].likes = repositories[repositoryIndex].likes + 1;
  
  return response.json(repository);

});

module.exports = app;
