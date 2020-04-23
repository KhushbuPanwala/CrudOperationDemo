using CRUDOperationDemo.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDOperationDemo.Repository.UserRepository
{
    public class UserDetailRepository : IUserDetailRepository
    {
        readonly ApplicationContext userContext;
        public UserDetailRepository(ApplicationContext context)
        {
            userContext = context;

        }
        public List<UserDetail> GetAllUserDetail()
        {
            return userContext.UserDetails.ToList();
        }

        public UserDetail GetUserDetailById(int id)
        {
            return userContext.UserDetails
                .FirstOrDefault(e => e.Id == id);
        }

        public bool AddUserDetail(UserDetail userDetail)
        {
            userContext.UserDetails.Add(userDetail);
            int count = userContext.SaveChanges();
            return ((count > 0) ? true : false);

        }

        public bool UpdateUserDetail(UserDetail userDetails)
        {
            userContext.UserDetails.FirstOrDefault(a => a.Id == userDetails.Id).FirstName = userDetails.FirstName;
            userContext.UserDetails.FirstOrDefault(a => a.Id == userDetails.Id).LastName = userDetails.LastName;
            userContext.UserDetails.FirstOrDefault(a => a.Id == userDetails.Id).Email = userDetails.Email;
            userContext.UserDetails.FirstOrDefault(a => a.Id == userDetails.Id).Gender = userDetails.Gender;
            userContext.UserDetails.FirstOrDefault(a => a.Id == userDetails.Id).Password = userDetails.Password;

            userContext.SaveChanges();
            return true;

        }

        public bool DeleteUserDetail(int id)
        {
            UserDetail userDetail = GetUserDetailById(id);
            userContext.UserDetails.Remove(userDetail);
            int count = userContext.SaveChanges();
            return ((count > 0) ? true : false);
        }

    }
}
