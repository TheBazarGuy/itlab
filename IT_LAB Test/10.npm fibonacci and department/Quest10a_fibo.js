function nthFibo(n)
{
  if(n <= 1)
  {
     return n;
  }
  var f = 1;
  var fiboPrev = 1;
  for(var i = 2; i < n; ++i)
  {
      var temp = f;
      f += fiboPrev;
      fiboPrev = temp;
   }
   return f;
}
module.exports.nthFibo=nthFibo
