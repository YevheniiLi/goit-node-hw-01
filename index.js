const db = require("./contacts");
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
      const contacts = await db.listContacts();
      console.table(contacts);
      break;

    case "add":
      await db.addContact(name, email, phone);
      console.log(`Contact ${name} has been added to your list`);
      break;

    case "get":
      const getContacts = await db.getContactById(id);
      console.table(getContacts);
      break;

    case "remove":
      await db.removeContact(id);
      console.log(`Сontact ${id} has been removed from your list`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);