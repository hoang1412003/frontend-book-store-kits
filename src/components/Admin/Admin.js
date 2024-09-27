import React, { useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBook } from '../../redux/bookSlice';
import { getAllCategories } from '../../redux/categorySlice'; // Đảm bảo import đúng

export default function Admin() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories || []); // Đảm bảo categories là một mảng
    const [formData, setFormData] = useState({
        bookTitle: '',
        authorName: '',
        category_id: '5', // Danh mục mặc định
        bookDescription: ''
    });

    useEffect(() => {
        dispatch(getAllCategories({ currentPage: 0, limit: 10 })); // Gọi API để lấy danh mục
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewBook(formData));
        // Có thể reset form sau khi gửi
        setFormData({
            bookTitle: '',
            authorName: '',
            category_id: '5',
            bookDescription: ''
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="bookTitle">Tiêu đề sách</Label>
                    <Input
                        id="bookTitle"
                        name="bookTitle"
                        placeholder="Nhập tiêu đề"
                        type="text"
                        value={formData.bookTitle}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="authorName">Tên tác giả</Label>
                    <Input
                        id="authorName"
                        name="authorName"
                        placeholder="Nhập tên tác giả"
                        type="text"
                        value={formData.authorName}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Danh mục</Label>
                    <Input
                        id="exampleSelect"
                        name="category_id"
                        type="select"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name} {/* Thay thế 'name' bằng thuộc tính tên phù hợp */}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="bookDescription">Mô tả sách</Label>
                    <Input
                        id="bookDescription"
                        name="bookDescription"
                        type="textarea"
                        value={formData.bookDescription}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit">Thêm sách</Button>
            </Form>
        </Container>
    );
}
