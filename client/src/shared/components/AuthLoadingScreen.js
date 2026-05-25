function AuthLoadingScreen({ message = 'Loading...' }) {
  return (
    <div className="auth-page eduhive-app">
      <p className="auth-card__subtitle">{message}</p>
    </div>
  );
}

export default AuthLoadingScreen;
