function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center mt-8 py-4 border-t bg-gray-800 text-white px-4">
      
      <p>CopyWright &copy; : 2025 Aman Qureshi</p>
      
      <div className="flex mt-4 sm:mt-0">
        
        <a href="https://github.com/AmanQureshi0111/Algorithm_Visualizer" target="_blank" rel="noopener noreferrer">
          <img src="/GitHub-Mark.png" alt="GitHub" title="Source Code" className="w-8 h-8 rounded-full" />
        </a>
        
        <a href="https://www.linkedin.com/in/aman-qureshi-ab7811253/" target="_blank" rel="noopener noreferrer" className="ml-4">
          <img src="/LinkedIn-Logo.png" alt="LinkedIn" className="w-8 h-8 rounded-full" />
        </a>

        <a href="https://leetcode.com/AmanQureshi2502786" target="_blank" rel="noopener noreferrer" className="ml-4">
          <img src="/LeetCode-Logo.png" alt="LeetCode" className="w-8 h-8 rounded-full" />
        </a>

        <a href="mailto:amanq7362@gmail.com" target="_blank" rel="noopener noreferrer" className="ml-4">
          <img src="/Gmail-Logo.webp" alt="Gmail" className="w-8 h-8 " />
        </a>
      </div>

    </footer>
  );
}

export default Footer;