class ProfileController < ApplicationController

  def show_profile
    if current_user == nil
      redirect_to root_path, flash: {error: "You need to be logged in to do that!"}
    else
      begin
        @user = User.find(params[:id])
        @properties = Property.where(:uid => @user.id)
      rescue
        redirect_to root_path, flash: {error: "User does not exist"}
      end
    end
  end

  def edit_profile
    @profile_to_edit = User.find(params[:id])
    if @profile_to_edit != current_user
      redirect_to root_path, flash: {error: "You need to be logged in as the correct user to do that!"}
    end
  end

end
