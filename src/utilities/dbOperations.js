import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'todoAppDb',
    location: 'default',
  },
  () => console.log('db has opened successfully'),
  error => console.log(error),
);

export const createTable = name => {
  db.transaction(
    tx => {
      const date = new Date();
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          name +
          ' ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'TodoText TEXT,' +
          'Done INTEGER DEFAULT 0,' +
          'Date TEXT);',
      );
    },
    (_, error) => console.log(_),
  );
};

export const getTodos = setTodos => {
  db.transaction(
    tx => {
      //console.log(tx);
      tx.executeSql('select * from Todos', [], (_, {rows}) => {
        //console.log(rows);
        let todos = [];
        if (rows.length === 0) {
          console.log('veri yok');
          setTodos(todos);
        } else {
          for (let index = 0; index < rows.length; index++) {
            todos.push(rows.item(index));
          }
          setTodos(todos);
        }
      });
    },
    (_, error) => console.log(_),
  );
};

export const addTodo = todo => {
  db.transaction(tx => {
    tx.executeSql(
      'insert into Todos (TodoText,Done,Date) values (?,?,?)',
      [todo.TodoText, todo.Done, todo.Date],
      (_, {rows}) => {
        console.log('added');
      },
      (_, error) => console.log(_),
    );
  });
};

export const deleteTodo = id => {
  db.transaction(tx => {
    tx.executeSql(
      'delete from Todos where ID=?',
      [id],
      (_, {rows}) => {
        console.log('deleted');
      },
      (_, error) => console.log(_),
    );
  });
};

export const updateTodo = todo => {
  db.transaction(tx => {
    tx.executeSql(
      'update Todos set TodoText=?,Done=? where ID=?',
      [todo.TodoText, todo.Done, todo.ID],
      (_, {rows}) => {
        console.log(`${todo.TodoText} is updated`);
      },
      (_, error) => console.log(_),
    );
  });
};
