import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import starRightImg from "./assets/check_mark_with_review_stars.jpg"
import profile from "./assets/profile-pic.png"
import { HStack, Tag } from '@chakra-ui/react'

function App() {
  const [reviews, setReviews] = useState<any[]>([]); 

  const [formData, setFormData] = useState<any>({
    rating: 1,
    selectedTags: [],
    comment: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleTagClick = (tag: string): void => {
    setError(null)
    if (formData.selectedTags.includes(tag)) {
      setFormData((prevData: { selectedTags: any[] }) => ({
        ...prevData,
        selectedTags: prevData.selectedTags.filter((selectedTag: string) => selectedTag !== tag)
      }));
    } else {
      setFormData((prevData: { selectedTags: any }) => ({
        ...prevData,
        selectedTags: [...prevData.selectedTags, tag]
      }));
    }
  };

  const handleCommentChange = (event: any): void => {
    setFormData((prevData: any) => ({
      ...prevData,
      comment: event.target.value
    }));
  };

  const handleSubmit = (): void => {
    if (formData.selectedTags.length === 0) {
      setError("Please select at least one tag.");
    } else {
      setError(null);
      setReviews(prevReviews => [...prevReviews, formData]);
      setFormData({
        rating: 1,
        selectedTags: [],
        comment: ''
      });
    }
  };
  return (
    <div className="container bg-[#f0f0f0] mx-auto pb-6">

      {/* Profile Section */}
      <div className="bg-[#daeff8] py-3">
        <div className="ml-5 pb-4">
          <ArrowBackIcon w={22} h={22} color="#808080" /><span className="font-medium ml-3">Pay Tip</span>
        </div>
        <div className="flex flex-row md:flex-row items-center justify-around">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={profile} className='ml-4 w-16 md:w-40 md:h-40 h-16 rounded-full mr-4' alt='Profile' />
            <div>
              <h1 className='text-xl md:text-[48px] font-medium'>John Doe</h1>
              <p className='text-[10px] md:text-[18px] md:mt-2 text-gray-500'>Manager</p>
              <p className='text-[10px] md:text-[16px] text-gray-500 italic'>"I'm happy to work here"</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex  items-center">
              <span className='text-3xl md:text-[48px] font-medium mr-2'>
                {reviews.length > 0 ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1) : '0.0'}
              </span>
              <StarIcon w={22} h={22} color="#FFDF00" />
            </div>
            <div className="text-blue-500 text-[10px] md:text-[14px] mt-2">
              {reviews.length} Reviews
            </div>
          </div>
        </div>
      </div>

      {/* Rate Your Experience Section */}
      <div className="bg-[#ffffff] mt-4 rounded-lg py-3 mx-2 shadow-md">
        <div className="flex flex-row md:flex-row items-center justify-around">
          <div className="flex flex-col items-between md:items-between mb-4 md:mb-0">
            <h2 className='text-[12px] md:text-[36px] font-medium mb-4'>Rate Your Experience.</h2>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((index) => (
                <StarIcon
                  key={index}
                  w={16}
                  h={16}
                  color={formData.rating >= index ? "#FFDF00" : "#808080"}
                  onClick={() => setFormData((prevData: any) => ({ ...prevData, rating: index }))}
                  className='cursor-pointer mr-2'
                />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <img src={starRightImg} className='w-24 md:w-80' alt='Review stars' />
          </div>
        </div>
      </div>

      {/* chip selection section  */}
      <div className="bg-[#ffffff] mt-4 rounded-lg py-3 mx-2 shadow-md">
        <div className="flex flex-row md:flex-row mx-5">
          <div className=" mb-4 md:mb-0">
            <h2 className='text-[12px] md:text-[22px] font-medium mb-4'>What did you like ?</h2>
            <div className="flex">
              <HStack spacing={4} className="flex flex-wrap">
                {['Positive Attitude', 'Fast Service', 'Friendliness', 'Professionalism', 'Cleanliness', 'Accuracy'].map((tag, index) => (
                  <Tag
                    key={index}
                    size={'sm'}
                    color={'#00000'}
                    className={`text-[10px] px-3 py-1 md:text-[18px] rounded-xl border ${formData.selectedTags.includes(tag) ? 'bg-blue-200 border-blue-500' : 'border-[#D3D3D3] bg-white'}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </div>
            {error && <p className="text-red-500 text-[12px] md:text-[18px] ml-2">{error}</p>}
          </div>
        </div>
      </div>

      {/* Optional Question  */}
      <div className="bg-[#ffffff] mt-4 rounded-lg py-3 mx-2 shadow-md">
        <div className="flex flex-row md:flex-row mx-5">
          <div className=" mb-4 md:mb-0">
            <h2 className='text-[12px] font-medium mb-4  md:text-[22px]'>Tell Us More (Optional) ?</h2>
            <div className="flex">
              <textarea
                className='border border-[#D3D3D3] '
                rows={3}
                style={{ resize: 'none',width:'82vw' }}
                value={formData.comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#D3D3D3] text-center mt-4 rounded-lg py-3 mx-2 shadow-md">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default App
