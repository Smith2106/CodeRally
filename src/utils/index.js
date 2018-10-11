export const validateUrl = (url) => {
  const urlRegex = /^https:\/\/(www\.)?[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,10}/;
  if (urlRegex.test(url)) {
    return true;
  }
  return false;
};

export const validateRepoLink = (link) => {
  const urlRegex = /^((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:\/\-~]+)(\.git)(\/)?$/;
  if (urlRegex.test(link)) {
    return true;
  }
  return false;
};

export default {
  validateUrl,
  validateRepoLink,
};
