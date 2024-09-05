import AddTodo from "./AddTodo";
import {Todos} from "./Todos";
import Navbar from "./Navbar";
import "./globals.css";


const Page = () => {
    return (
      <main>
          <h2> TODO   </h2>
          <Navbar />
          <AddTodo />
          <Todos />
      </main>
    );
};

export default Page;
