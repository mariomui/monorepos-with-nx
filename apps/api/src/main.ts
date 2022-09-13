import express from 'express';
import { Send } from 'express-serve-static-core';
import { Message } from '@bookspear/api-interfaces';
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
const app = express();

const greeting: Message = { message: 'Welcome to api!', error: null };

app.get('/api/greeting', (req, res: TypedResponse<{ data: Message }>) => {
  return handleResponse<Message>(res, greeting);
});

function handleResponse<D>(res, data: D) {
  res.status(200).send(data);
}

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
