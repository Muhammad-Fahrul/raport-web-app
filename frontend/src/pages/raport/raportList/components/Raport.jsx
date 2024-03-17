const Raport = ({ item, handleDetail, setScreen }) => {
  return (
    <tr key={item._id}>
      <td>{item.chapter}</td>
      <td>{item.verse}</td>
      <td>
        <span
          style={{
            display: 'block',
            width: '20px',
            height: '20px',
            borderRadius: '150px',
            backgroundColor: 'green',
            marginInline: 'auto',
          }}
        ></span>
      </td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleDetail(item._id);
          setScreen(true);
        }}
      >
        {item.detail.split('').slice(0, 6).join('') + '...'}
      </td>
    </tr>
  );
};

export default Raport;
