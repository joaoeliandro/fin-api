import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

const costumers = [];

app.post('/account', (request, response) => {
  try {

    const { cpf, name } = request.body;

    const constumerAlreadyExists = costumers.some((constumer) => constumer.cpf === cpf);

    if (constumerAlreadyExists)
      throw new Error('Costumer already exists.');

    costumers.push({
      id: uuidv4(),
      cpf,
      name,
      statement: [],
    });

    return response.status(201).json(costumers);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

app.get('/statement/:cpf', (request, response) => {
  try {
    const { cpf } = request.params;

    const costumer = costumers.find(costumer => costumer.cpf === cpf);

    if (!costumer)
      throw new Error('Costumer not found.');

    return response.status(201).json(costumer.statement);
  } catch (err) {
    return response.status(404).json({ error: err.message });
  }
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
})