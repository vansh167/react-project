
import Calculate from '../pages/calcu';
import Project1 from '../pages/CRUD';
import Cont3 from '../pages/form';
import Quiz from '../pages/quiz';
import Todo from '../pages/ToDo';
import Project2 from '../pages/useState';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

let Path = () => {


    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Project1 />} />
                    <Route path="/about" element={<Project2 />} />
                   <Route path="/contact" element={<Cont3 />} />
                   <Route path="/todo" element={<Todo/>}/>
                   <Route path="/calcu" element={<Calculate/>}/>
                   <Route path="/quiz" element={<Quiz/>}/>

                </Routes>
            </BrowserRouter>
        </>


    );
};
export default Path; 