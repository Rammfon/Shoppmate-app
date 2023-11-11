const RemoveMember = ({ member, onRemove }) => {
  const handleRemove = () => {
    onRemove(member); 
  };

  return (
    <button  className="button" onClick={handleRemove}>Odebrat člena</button>
  );
};

export default RemoveMember;

