import {
  useContactsQuery,
  useContactQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} from "./services/contactsApi";
import "./App.css";
interface Props {
  refetch: () => void;
}
function App() {
  const { data, error, isLoading, isSuccess, refetch } = useContactsQuery();
  const [deleteContact] = useDeleteContactsMutation();

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await deleteContact(id);
      // refetch();
    } catch (err) {
      console.error("Failed to delete the contact: ", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong </p>;

  return (
    <>
      <table className="table table-striped border border-2 border-primary">
        <thead>
          <tr>
            <th scope="col">Details</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data?.map((contact) => (
              <tr key={contact.id}>
                <td>
                  {contact.name}
                  <div>
                    <ContactDetail id={contact.id} />
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <AddContact refetch={refetch} />
    </>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const data = useContactQuery(id);
  return <span>{JSON.stringify(data.data, null, 2)}</span>;
};

export const AddContact = ({ refetch }: Props) => {
  const [addContacts] = useAddContactsMutation();
  const contact = {
    id: `${Math.floor(Math.random() * 90) + 10}`,
    name: `${Math.random().toString(36).substring(2, 7)}`,
    email: `${Math.random().toString(36).substring(2, 7)}.doe@example.com`,
  };

  const addHandler = async () => {
    try {
      await addContacts(contact);
      // refetch();
    } catch (err) {
      console.error("Failed to add the contact: ", err);
    }
  };

  return (
    <button className="btn btn-outline-success" onClick={addHandler}>
      Add Contact
    </button>
  );
};

export default App;
