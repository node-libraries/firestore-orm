import { deleteApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  FirestoreProperty,
  FirestoraDoc,
  saveFireDoc,
  newClass,
  getFireDocs,
} from '@node-libraries/firestore-orm';

require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

@FirestoraDoc('Content') //Collection name
class Content {
  @FirestoreProperty('id')
  id?: string;
  @FirestoreProperty()
  title!: string;
  @FirestoreProperty()
  body!: string;
  @FirestoreProperty()
  visible!: boolean;
  @FirestoreProperty()
  keywords?: string[];
  @FirestoreProperty('created')
  createdAt?: Date;
  @FirestoreProperty('updated')
  updatedAt?: Date;
}

(async () => {
  const value = newClass(Content, { title: 'title', visible: false, body: 'Body' });
  await saveFireDoc(firestore, value);

  const docs = await getFireDocs(firestore, Content);
  console.log({ docs });

  if (docs[0]) {
    docs[0].title = 'title2';
    await saveFireDoc(firestore, docs[0]);
  }

  const docs2 = await getFireDocs(firestore, Content);
  console.log({ docs2 });

  await deleteApp(app);
})();
