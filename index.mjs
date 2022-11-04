import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = await MongoMemoryServer.create();

(async () => {
  await mongoose.connect(mongoServer.getUri(), { dbName: 'demo' });

  const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  const user = mongoose.model('customers', userSchema);

  await user.create({
    name: 'John',
    age: 30,
  });

  const document = await user
    .find({})
    .where({ name: 'John' })
    .where('age')
    .gt(20)
    .lt(45);

  console.log(document);

  setTimeout(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  }, 5);
})();
