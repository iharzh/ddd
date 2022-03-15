interface UserProps {
  user: any;
}

const User = ({ user }: UserProps) => {
  return (
    <div>
      User page
      <ul>
        {Object.entries(user).map(([key, value]: [string, unknown]) => {
          return (
            <li key={key}>
              {key} - {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
