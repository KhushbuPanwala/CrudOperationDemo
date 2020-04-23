using CRUDOperationDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDOperationDemo.Repository.UserRepository
{
    public interface IUserDetailRepository
    {
        /// <summary>
        /// Get all user details
        /// </summary>
        /// <returns>list of user details</returns>
        List<UserDetail> GetAllUserDetail();

        /// <summary>
        /// Get user details by given id
        /// <param name="id">id of user detail </param>
        /// </summary>
        /// <returns>user details for given id</returns>
        UserDetail GetUserDetailById(int id);

        /// <summary>
        /// Add new user details 
        /// <param name="model">user detail saved in database</param>
        /// </summary>
        /// <returns>Task</returns>
        bool AddUserDetail(UserDetail userDetail);

        /// <summary>
        /// Update user details 
        /// <param name="model">updated user detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool UpdateUserDetail(UserDetail userDetail);

        /// <summary>
        /// Delete user details 
        /// <param name="id">id of delete user detail </param>
        /// </summary>
        /// <returns>Task</returns>
        bool DeleteUserDetail(int id);
    }
}
