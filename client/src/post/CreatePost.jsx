import { TextInput, Select, FileInput, Button, Label } from "flowbite-react";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from "../firebase.js";
import toast, { Toaster } from 'react-hot-toast';
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    console.log(formData)
    const { currentUser } = useSelector((state) => state.user);
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        try {
            if (!file) {
                setImageUploadError('Please Select a PDF');
                toast.error("No PDF uploaded");
                return;
            }

            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Something went wrong');
                    toast.error('Something went wrong');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, pdf: downloadURL });
                    }).catch((error) => {
                        setImageUploadError('Error getting download URL: ' + error.message);
                        toast.error('Error getting download URL: ' + error.message);
                        setImageUploadProgress(null);
                    });
                }
            );

        } catch (err) {
            setImageUploadError('PDF upload failed');
            setImageUploadProgress(null);
            toast.error('PDF upload failed');
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                ...formData,
                author: currentUser.username,
            };

            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                toast.error(data.message);
            } else {
                setPublishError(null);
                toast.success('PYQ is uploaded successfully');
                navigate(`/post/${data.slug}`);
            }
        } catch (err) {
            setPublishError(err.message);
            toast.error('Oops! The PYQ was not uploaded');
        }
    }

    return (
        <div className='flex items-center justify-center gap-3 flex-col md:flex-row'>


        <div className="">
            <Toaster />
            <h1 className='text-3xl font-bold text-center mt-5 mb-2'>Post Your PYQ here</h1>
            <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit}>
                <TextInput
                    className='w-[400px]'
                    type='text'
                    placeholder='Enter the name of School'
                    name='title'
                    id='title'
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <TextInput
                    className='w-[400px]'
                    type='text'
                    placeholder='Enter the year of the question paper (eg. 2023)'
                    name='year'
                    id='year'
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
                
                <Select
                    className='w-[400px]'
                    id='exam'
                    name='exam'
                    onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                    
                >
                    <option value=''>Choose Your Exam</option>
                    <option value='Secondary'>Secondary</option>
                    <option value='Higher-secondary'>Higher Secondary</option>
                    <option value='Secondary-Test'>Secondary-Test</option>
                    <option value='Higher-Secondary-Test'>Higher-Secondary-Test</option>
                    
                </Select> <Select
                    className='w-[400px]'
                    id='board'
                    name='board'
                    onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                >  <option value=''>Choose Your Board</option>
                    <option value='WB'>WB</option>
                    <option value='ICSE'>ICSE</option>
                    <option value='CBSE'>CBSE</option>
                </Select>
                <Select
                    className='w-[400px]'
                    id='medium'
                    name='medium'
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                >
                      <option value=''>Choose Your Medium</option>
                    <option defaultValue='Bengali'>Bengali</option>
                    <option value='English'>English</option>
                    <option value='Hindi'>Hindi</option>
                    <option value='Urdu'>Urdu</option>
                </Select>
                   <Select
                    className='w-[400px]'
                    id='subject'
                    name='subject'
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                   <option value=''>Choose Your Subject</option>
      <option value='Accountancy'>Accountancy</option>
      <option value='Arabic'>Arabic</option>
      <option value='Bengali'>Bengali</option>
      <option value='Biology'>Biology</option>
      <option value='Chemistry'>Chemistry</option>
      <option value='Computer'>Computer</option>
      <option value='Economics'>Economics</option>
      <option value='English'>English</option>
      <option value='Geography'>Geography</option>
      <option value='Hindi'>Hindi</option>
      <option value='History'>History</option>
      <option value='Life-Science'>Life-Science</option>
      <option value='Mathematics'>Mathematics</option>
      <option value='Physical-Education'>Physical Education</option>
      <option value='Physical-Science'>Physical Science</option>
      <option value='Physics'>Physics</option>
      <option value='Political-Science'>Political Science</option>
      <option value='Sanskrit'>Sanskrit</option>
      <option value='Statistics'>Statistics</option>
      <option value='Urdu'>Urdu</option>
    </Select>
                   
                <Label>*Only PDF under 200 KB is supported</Label>
                <div className='flex gap-2'>
                    <FileInput
                        type='pdf'
                        accept='application/pdf'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToPink'
                        outline
                        onClick={handleUpload}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                            </div>
                        ) : (
                            'Upload PDF'
                        )}
                    </Button>
                </div>

                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Upload PYQ
                </Button>
            </form>
        </div>

                {formData.pdf && (
                    <embed src={formData.pdf} alt='upload' className='w-72 h-72 object-cover' />
                )}


        </div>
    );
}
