const fs = require('fs');

if (process.argv[2] === 'list') {
  if (process.argv.length === 3) {
    fs.readFile('./note.json', 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        const notes = JSON.parse(data);
        console.log(`Printing ${notes.length} note(s).`);
        notes.map(e => console.log(`--\nTitle: ${e.title}\nBody: ${e.body}`));
      }
    });
  } else {
    console.log("Syntax error: list command doesn't require an option");
  }
} else if (process.argv[2] === 'add') {
  if (
    process.argv[3] === '--title' &&
    process.argv[4] &&
    process.argv[5] === '--body' &&
    process.argv[6]
  ) {
    fs.readFile('./note.json', 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        const notes = JSON.parse(data);
        notes.push({ title: process.argv[4], body: process.argv[6] });
        const json = JSON.stringify(notes);
        fs.writeFile('./note.json', json, 'utf8', err => {
          if (err) console.error(err);
          console.log('Note created');
        });
      }
    });
  } else {
    console.log(
      'add options:\n --title to set your note title\n --body to set your note body'
    );
  }
} else if (process.argv[2] === 'read') {
  if (process.argv[3]) {
    fs.readFile('./note.json', 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        const notes = JSON.parse(data);
        const myNote = notes.filter(e => e.title === process.argv[3]);
        if (myNote[0]) {
          console.log(
            `Note found\n--\nTitle: ${myNote[0].title}\nBody: ${myNote[0].body}`
          );
        } else {
          console.log('note not found');
        }
      }
    });
  } else {
    console.log('option --title is required');
  }
} else if (process.argv[2] === 'remove') {
  if (process.argv[3]) {
    fs.readFile('./note.json', 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        const notes = JSON.parse(data);
        const newNotes = notes.filter(e => e.title !== process.argv[3]);
        const json = JSON.stringify(newNotes);
        fs.writeFile('./note.json', json, 'utf8', err => {
          if (err) console.error(err);
          console.log('Note deleted');
        });
      }
    });
  } else {
    console.log('option --title is required');
  }
} else {
  console.log('commands:\n add,list,remove,read');
}
