import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, query, onDeleteContact }) => {
  console.log(contacts);
  return contacts.length > 0 ? (
    <ul className={css.contactList}>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(query.toLowerCase())
        )
        .map(({ id, name, number }) => {
          return (
            <li className={css.contactItem} key={id}>
              {name}: {number}
              <button
                className={css.listItemBtn}
                id={id}
                type="button"
                onClick={onDeleteContact}
              >
                Delete
              </button>
            </li>
          );
        })}
    </ul>
  ) : (
    <p className={css.contactListDefault}>
      Sorry, your phonebook is empty. <br></br>
      Add your first contact, please.
    </p>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  query: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
