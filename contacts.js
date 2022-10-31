const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const response = await fs.readFile(contactsPath);
  const contacts = JSON.parse(response);
  return contacts;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(item => item.id === contactId);
  if (!foundContact) {
    return null;
  }
  const removedItems = contacts.filter(item => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(removedItems));
  return foundContact;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const foundContact = contacts.find(item => item.id === contactId);
  return foundContact;
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};