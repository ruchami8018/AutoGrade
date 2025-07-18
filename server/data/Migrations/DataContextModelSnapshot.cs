﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using data;

#nullable disable

namespace data.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("core.Models.AiAction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ActionType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("InputData")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Result")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("AiActions");
                });

            modelBuilder.Entity("core.Models.ChatMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChatTopicId")
                        .HasColumnType("int");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ChatTopicId");

                    b.HasIndex("SenderId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("core.Models.ChatTopic", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CreatedById")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("ChatTopics");
                });

            modelBuilder.Entity("core.Models.FileUpload", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("FileId")
                        .HasColumnType("int");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<string>("StudentName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SubmissionNumber")
                        .HasColumnType("int");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("FilesUploads");
                });

            modelBuilder.Entity("core.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("School")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("created_at")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("core.Models.UserFile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FilePath")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Size")
                        .HasColumnType("int");

                    b.Property<string>("Tags")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("core.Models.ChatMessage", b =>
                {
                    b.HasOne("core.Models.ChatTopic", "ChatTopic")
                        .WithMany("Messages")
                        .HasForeignKey("ChatTopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("core.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ChatTopic");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("core.Models.ChatTopic", b =>
                {
                    b.HasOne("core.Models.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("core.Models.UserFile", b =>
                {
                    b.HasOne("core.Models.User", null)
                        .WithMany("files")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("core.Models.ChatTopic", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("core.Models.User", b =>
                {
                    b.Navigation("files");
                });
#pragma warning restore 612, 618
        }
    }
}
