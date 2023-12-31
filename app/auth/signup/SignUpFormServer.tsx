'use server'
// export async function getServerSideProps(context) {
//   // No specific data fetching required for this page, but you can add it here if needed
//   return {
//     props: {},
//   };
// }
const SignUpFormServer = () => {
  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Perform validation on the server
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center">
      {/* <Toast message={resposeMessage} flag={flag} type={type} /> */}
      <section className="w-full h-full grid gap-2 md:grid-cols-2 md:w-10/12 md:h-3/6 lg:w-8/12 lg:h-4/6">
        <div className="hidden md:block bg-blue-500 rounded-l-md "></div>
        <form onSubmit={(e)=>handleSignup(e)} className="w-full h-full justify-center p-4 md:p-4 md:justify-center rounded-r-sm flex flex-col gap-3">
          <p className="text-2xl text-center font-bold text-blue-500">ACMERA</p>
          <input
            type="text"
            name="phone"
          />
          <input
            //errorMessage={passwordErrorMessage}
            key="password"
            type="password"
            placeholder="********"
            name="password"
            // ref={passwordRef}
          />
          <input
            //errorMessage={confirmPasswordErrorMessage}
            key="confirm"
            type="password"
            placeholder="********"
            name="confirmPassword"
           // ref={confirmPasswordRef}
          />
          <div className="flex flex-col mt-8 gap-2">
            <input type="submit" className="px-6 py-2 bg-blue-500 rounded-md " value={"Sign up"}/>
          </div>
        </form>
      </section>
    </div>
  );
};
export default SignUpFormServer;
