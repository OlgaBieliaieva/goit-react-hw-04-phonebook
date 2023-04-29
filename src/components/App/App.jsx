import { useEffect, useReducer } from 'react';
import shortid from 'shortid';
import SectionTitle from '../SectionTitle/SectionTitle';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';

function init(state) {
  const savedContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(savedContacts);

  if (parsedContacts !== null) {
    return { ...state, contacts: [...parsedContacts] };
  }

  return state;
}

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, contacts: [...state.contacts, action.payload] };

    case 'delete':
      return { ...state, contacts: [...action.payload] };

    case 'filter':
      return { ...state, filter: action.payload };

    default:
      return;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(
    countReducer,
    { contacts: [], filter: '' },
    init
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    const contactNames = [];
    state.contacts.map(contact => contactNames.push(contact.name));

    if (contactNames.includes(name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch({ type: 'add', payload: newContact });
  };

  const deleteContact = e => {
    const contactId = e.target.id;
    const remainingContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );

    dispatch({ type: 'delete', payload: remainingContacts });
  };

  const handleFilterChange = e => {
    const { value } = e.target;
    dispatch({ type: 'filter', payload: value });
  };

  return (
    <main className={css.appContainer}>
      <SectionTitle text="Phonebook" />
      <ContactForm addContact={addContact} />

      <SectionTitle text="Contacts" />
      <Filter filter={state.filter} filterChangeHandler={handleFilterChange} />
      <ContactList
        contacts={state.contacts}
        query={state.filter}
        onDeleteContact={deleteContact}
      />
    </main>
  );
}
