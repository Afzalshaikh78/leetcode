"use server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;

    const newUser = await prisma.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0].emailAddress || "",
      },
    });

    return { success: true, message: "User onboarded", user: newUser };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error onboarding user" };
  }
};

export const currentUserRole = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const { id } = user;
    const userRole = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });

    return userRole?.role;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error fetching user role" };
  }
};

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }
    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        submissions: true,
        solvedProblems: {
          include: {
            problem: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        playlists: {
          include: {
            problems: {
              include: {
                problem: {
                  select: {
                    id: true,
                    title: true,
                    difficulty: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
