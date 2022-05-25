function useLocalStorage() {
  // Hook เอาไว้จัดการกับพวกข้อมูลใน local storage
  // ยังทำไม่เสร็จ
  const getUserId = localStorage.getItem("id");
  const getJobId = localStorage.getItem("jobId");
  const clearUserId = localStorage.removeItem("id");
  const clearJobId = localStorage.removeItem("jobId");

  return { getUserId, getJobId, clearUserId, clearJobId };
}

export default useLocalStorage;
