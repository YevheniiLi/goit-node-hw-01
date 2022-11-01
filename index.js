const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone } = argv) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log('Contact added:', newContact);
      break;

    case "get":
      const gotContact = await contacts.getContactById(id);
      console.table(gotContact);
      break;

    case "remove":
      const contactForDelete = await contacts.removeContact(id);
      console.log('Сontact removed:', contactForDelete);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);