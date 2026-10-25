import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header.tsx";
import Login from "./components/Login.tsx";
import TodoList from "./todo/TodoList.tsx";
import AuthGuard from "./auth/AuthGuard.tsx";
import Register from "./components/Register.tsx";
import TodoForm from "./todo/TodoForm.tsx";


export default function App() {
  return (
      <>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/todo-form" element={
                      <AuthGuard>
                        <TodoForm />
                      </AuthGuard>
                  } />
                  <Route path="/" element={
                      <AuthGuard>
                            <TodoList />
                      </AuthGuard>
                  } />
                  <Route path="/register" element={<Register />} />
              </Routes>
          </BrowserRouter>
      </>
  )
}