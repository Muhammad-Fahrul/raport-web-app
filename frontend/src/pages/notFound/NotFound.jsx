import Button from '../../components/button/Button';

export default function NotFound() {
  return (
    <div className="container-notfound">
      <h3>Sorry, the page you were looking for was not found.</h3>
      <Button url="/" text="home" />
    </div>
  );
}
