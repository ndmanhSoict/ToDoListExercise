export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form>
        <label>
          Email:
          <input className="border border-gray-300 p-2 rounded" type="email" name="email" />
        </label>
        <label>
          Password:
          <input className="border border-gray-300 p-2 rounded" type="password" name="password" />
        </label>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
