"use client";
import { Card, CardHeader } from "./ui/card";
import { Table, TableRow, TableCell, TableBody } from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckCheck } from "lucide-react";
import { BiX } from "react-icons/bi";
import { fetchTodos, checkTodo, sendTodo } from "@/data/data";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  is_complete: boolean;
};
type todoToSend = {
  text: string;
  is_complete: boolean;
};

const Todoapp1 = () => {
  /** */
  const [isClient, setIsClient] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);
  /**This is for the text to be displayed */
  const [text, setText] = useState("");
  const [textDisplay, setTextDisplay] = useState<string>("");
  /*Setting the parameters for pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(6);
  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
    setIsClient(true);
  }, []);
  //console.log("THE LENGTH OF TODOS ARRAY", todos.length);
  /**Calculations for paginations */
  const lastTodoIndex = currentPage * todosPerPage;
  const firstTodoIndex = lastTodoIndex - todosPerPage;
  const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex);
  //console.log("THESE ARE THE TODOS", todos);
  const handleCheck = async (id: number) => {
    console.log("Item id is", id);
    const response = await checkTodo(id);
    const newList = await fetchTodos();
    setTodos(newList);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    const todo: todoToSend = {
      text: text,
      is_complete: false,
    };
    setTextDisplay(text);
    setText("");
    const response = await sendTodo({ ...todo });
    /**For debugging */
    // console.log(response);
    //!!After adding new todo refresh the display
    const newList = await fetchTodos();
    setTodos(newList);
  };
  return (
    <div className="bg-background min-h-screen w-full flex flex-col items-center space-y-10">
      <div className="w-full md:w-1/2 mt-10">
        <Card className="w-full">
          <CardHeader className="text-foreground text-2xl font-semibold text-center">
            Todo App with Poetry...
          </CardHeader>
        </Card>
      </div>
      <div className="w-full p-2  md:w-1/2">
        <div className="mb-4">
          <form
            className="flex items-center space-x-4"
            action="POST"
            onSubmit={handleSubmit}>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="Todo"
              placeholder="Add Todo"
            />
            <Button
              type="submit"
              className="bg-foreground text-background"
              variant="default">
              Add Todo
            </Button>
          </form>
        </div>

        <div>
          <Table className="w-full">
            <TableBody>
              {currentTodos.map((item) => (
                <TableRow
                  key={item.id}
                  className="flex items-center justify-between">
                  <TableCell>
                    {" "}
                    <p
                      className={`${
                        item.is_complete
                          ? "text-emerald-900"
                          : "text-foreground"
                      } text-base`}>
                      {item.text}
                    </p>
                  </TableCell>
                  <div className="flex  items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCheck(item.id)}>
                      <CheckCheck />
                    </Button>
                    <Button size="sm" variant="outline">
                      <BiX className="text-lg font-semibold" />
                    </Button>
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <MyPagination
            totalTodos={todos.length}
            todosPerPage={todosPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Todoapp1;

type PaginationProps = {
  todosPerPage: any;
  totalTodos: any;
  currentPage: any;
  setCurrentPage: any;
};
const MyPagination = ({
  todosPerPage,
  totalTodos,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}>
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
