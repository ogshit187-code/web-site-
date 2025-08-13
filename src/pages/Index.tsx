const Index = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ff0000',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      fontWeight: 'bold',
      textAlign: 'center',
      flexDirection: 'column'
    }}>
      <h1>🔥 РАБОТАЕТ!</h1>
      <p>Новый дизайн активен</p>
      <p>Время: {new Date().toLocaleTimeString()}</p>
      <button 
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '20px 40px',
          fontSize: '24px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('Кнопка работает!')}
      >
        ТЕСТ КНОПКИ
      </button>
    </div>
  );
};

export default Index;